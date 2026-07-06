"""Dumpling Dash ordering site.

Python standard library only -- no installs needed to run the site.
Serves the pages in public/ and a small JSON API under /api/.
"""
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import config
from pricing import quote_order
from store import all_orders, get_order, load_menu, place_order

PUBLIC_DIR = Path(__file__).parent / "public"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        length = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(length) or b"{}")

    def do_GET(self):
        path = self.path.split("?")[0]

        if path == "/api/menu":
            return self._send_json(list(load_menu().values()))

        if path == "/api/orders":
            return self._send_json(all_orders())

        if path.startswith("/api/orders/"):
            order = get_order(path.rsplit("/", 1)[-1])
            if order is None:
                return self._send_json({"error": "Order not found"}, 404)
            return self._send_json(order)

        return super().do_GET()

    def do_POST(self):
        path = self.path.split("?")[0]
        data = self._read_json()

        # Built this so the front end could ask the server for totals.
        # Never got round to wiring it up. -J
        if path == "/api/quote":
            return self._send_json(quote_order(data["lines"], load_menu()))

        if path == "/api/orders":
            try:
                order = place_order(data.get("customer", ""), data["lines"])
            except ValueError as err:
                return self._send_json({"error": str(err)}, 400)
            return self._send_json(order, 201)

        return self._send_json({"error": "Not found"}, 404)


if __name__ == "__main__":
    print(f"{config.TRUCK_NAME} is open at http://localhost:{config.PORT}")
    print("Press Ctrl+C to close the truck.")
    server = ThreadingHTTPServer(("127.0.0.1", config.PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nTruck closed. See you tomorrow.")

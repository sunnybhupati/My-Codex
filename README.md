# Dumpling Dash

A Python standard-library web server with a vanilla JavaScript frontend. There is no frontend build step. The site needs no third-party Python packages; the tests need `pytest`, listed in `requirements.txt`.

## Windows PowerShell setup

Install Git and Python 3.10 or newer with pip and the `py` launcher before starting. Open PowerShell in the folder where you want your checkout. Supply this repository's clone URL when prompted:

```powershell
$RepositoryUrl = Read-Host "Repository clone URL"
git clone "$RepositoryUrl" dumpling-dash
Set-Location .\dumpling-dash
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
```

If PowerShell blocks `Activate.ps1`, allow locally created scripts for this PowerShell session, then repeat activation and dependency installation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
```

Run the remaining commands from the repository root in that activated PowerShell session. When returning in a new PowerShell window, change to your checkout and activate `.venv` again. Using `py` without a version selector after activation uses the virtual environment.

## Run the tests

```powershell
py -m pytest
```

The current suite has one passing test and one explicitly skipped discount test. A successful run does not mean the skipped behavior has been verified.

## Run the site

```powershell
py server.py
```

Open these addresses in your browser:

- Customer ordering: <http://localhost:8080/>
- Kitchen screen: <http://localhost:8080/kitchen.html>

The server binds to `127.0.0.1:8080` on your machine. Stop it with Ctrl+C. The kitchen screen polls for orders every five seconds.

## Local data and Git

The menu is tracked in `data/menu.json`. Orders are local runtime data in `data/orders.json`, which Git ignores. A fresh clone has no orders file and starts with an empty order list: `store.py` returns an empty dictionary when that file is missing, then creates it when the first order is saved. Existing local orders are preserved.

The virtual environment, Python bytecode caches, and pytest cache are also ignored. After placing an order, you can check that order data and caches do not appear as changes:

```powershell
git status --short
```

Use this README for setup; `HANDOFF.md` contains outdated startup instructions.

#!/usr/bin/env python3
"""Serve the repository locally using only the Python standard library."""
import argparse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=8000)
parser.add_argument('--bind', default='127.0.0.1')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
os.chdir(root)
print(f'Serving {root} at http://{args.bind}:{args.port}/')
ThreadingHTTPServer((args.bind, args.port), SimpleHTTPRequestHandler).serve_forever()

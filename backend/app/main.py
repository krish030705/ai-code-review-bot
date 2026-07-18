from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# The FastAPI() instance is your entire application.
# Every route, middleware, and config attaches to this object.
app = FastAPI(title="AI Code Review Bot API")

# CORS = Cross-Origin Resource Sharing.
# Your frontend runs on http://localhost:5175 (or similar) and your backend
# will run on a different port (http://localhost:8000). Browsers block
# requests between different origins by default for security — CORS
# middleware explicitly tells the browser "this frontend origin is allowed
# to talk to this backend."
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(?:localhost|127\.0\.0\.1):517[3-9]",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A route: GET request to "/" runs this function and returns its result
# as JSON automatically — no manual serialization needed.
@app.get("/")
def read_root():
    return {"message": "AI Code Review Bot API is running"}

# A simple health-check endpoint — real-world APIs almost always have one,
# used by deployment platforms (Render, in our case) to verify the server
# is alive.
@app.get("/health")
def health_check():
    return {"status": "ok"}
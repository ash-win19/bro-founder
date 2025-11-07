from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.router import router as api_v1_router


app = FastAPI(title="Bro Founder API", version="0.1.0")

# Allow local Next.js dev by default
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}


app.include_router(api_v1_router, prefix="/api/v1")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


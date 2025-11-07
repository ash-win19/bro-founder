from fastapi import APIRouter

from . import hello


router = APIRouter()

# Aggregate v1 endpoints here
router.include_router(hello.router)


from pydantic import BaseModel
from typing import List


class MovieRequest(BaseModel):
    movie: str


class MovieItem(BaseModel):
    title: str


class MovieResponse(BaseModel):
    recommendations: List[MovieItem]
from pydantic import BaseModel, field_validator

ALLOWED_LANGUAGES = {"python", "javascript", "java", "cpp", "html", "css", "json", "text"}
MAX_CODE_LENGTH = 50_000

class CodeSubmission(BaseModel):
    code: str
    language: str
    project_id: int

    @field_validator("language")
    @classmethod
    def validate_language(cls, v):
        if v not in ALLOWED_LANGUAGES:
            raise ValueError(f"Unsupported language: {v}")
        return v

    @field_validator("code")
    @classmethod
    def validate_code_length(cls, v):
        if len(v) == 0:
            raise ValueError("Code cannot be empty")
        if len(v) > MAX_CODE_LENGTH:
            raise ValueError(f"Code exceeds maximum length of {MAX_CODE_LENGTH} characters")
        return v
import os
import json
from anthropic import Anthropic

api_key = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=api_key) if api_key else None

SYSTEM_PROMPT = """You are a senior software engineer performing a code review.
Analyze the given code and respond with ONLY a valid JSON object, no other text,
matching exactly this structure:

{
  "summary": "one or two sentence overall assessment",
  "bugs": ["list of bug descriptions, empty array if none"],
  "security": ["list of security issue descriptions, empty array if none"],
  "performance": ["list of performance issue descriptions, empty array if none"],
  "cleanCode": ["list of clean-code/best-practice issues, empty array if none"],
  "rating": "a rating out of 10, e.g. '7/10'",
  "suggestions": ["list of concrete improvement suggestions"]
}

Do not include markdown code fences, do not include any explanation outside the JSON."""


def _mock_review(code: str, language: str) -> dict:
    return {
        "summary": f"Demo-mode review of {len(code)} characters of {language} code (AI credit not configured).",
        "bugs": ["Demo mode: connect a funded ANTHROPIC_API_KEY to see real bug detection here."],
        "security": [],
        "performance": [],
        "cleanCode": ["Demo mode: real clean-code analysis appears here once AI credit is active."],
        "rating": "N/A (demo mode)",
        "suggestions": ["Add credit to your Anthropic account, then this endpoint automatically switches to live AI review."],
    }


def review_code(code: str, language: str) -> dict:
    if client is None:
        return _mock_review(code, language)

    user_prompt = f"Language: {language}\n\nCode to review:\n\n{code}"

    try:
        response = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=2000,
            temperature=0.2,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
    except Exception:
        return _mock_review(code, language)

    raw_text = response.content[0].text

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        cleaned = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        return json.loads(cleaned)
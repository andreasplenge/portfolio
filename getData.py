from pathlib import Path
import yaml

def getData(type):
    data = []

    if type == "information":
        path = f'data/general/{type}'
        with path.open() as f:
            data.extend(yaml.safe_load(f))

    if type == "qualifications":
        path = f'data/general/{type}'
        with path.open() as f:
            data.extend(yaml.safe_load(f))
    if type in ["experience", "education", "coursework"]:
        for path in Path(f'data/{type}').glob("*.yaml"):
            with path.open() as f:
                data.extend(yaml.safe_load(f))

    return sorted(
        data,
        key=lambda x: x.get("id", 0),
        reverse=True
    )
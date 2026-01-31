from pathlib import Path
import yaml

def getData(type):
    data = []
    if type == "information" or type == "qualifications":
        path = Path(f'data/general/{type}.yaml')
        with path.open() as f:
            data = yaml.safe_load(f)

    if type in ["experience", "education", "coursework"]:
        for path in Path(f'data/{type}').glob("*.yaml"):
            with path.open() as f:
                data.extend(yaml.safe_load(f))

    return sorted(
        data,
        key=lambda x: x.get("id", 0),
        reverse=True
    )
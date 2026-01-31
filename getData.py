from pathlib import Path
import yaml

def getData(type):
    data = None

    dataIsSingleObject = type == "information" or type == "qualifications"

    if dataIsSingleObject:
        path = Path(f'data/general/{type}.yaml')
        with path.open() as f:
            data = yaml.safe_load(f)

    if type in ["experience", "education", "coursework"]:
        data = []
        for path in Path(f'data/{type}').glob("*.yaml"):
            with path.open() as f:
                data.extend(yaml.safe_load(f))

    return data if dataIsSingleObject else sorted(
        data,
        key=lambda x: x.get("id", 0),
        reverse=True
    )
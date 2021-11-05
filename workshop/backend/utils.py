import os
import uuid

from config import DEFAULT_FILE_LOCATION


def build_code_file_path(language_extension):
    random_uuid = uuid.uuid4().hex
    return os.path.join(DEFAULT_FILE_LOCATION, f"{random_uuid}.{language_extension}")

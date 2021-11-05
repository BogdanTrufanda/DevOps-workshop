import os
from logging.config import dictConfig

from config import DEFAULT_FILE_LOCATION, SUPPORTED_LANGUAGES


def setup():
    for language in SUPPORTED_LANGUAGES:
        os.makedirs(os.path.join(DEFAULT_FILE_LOCATION,
                    f"{language}_files"), exist_ok=True)

    # configure app logging
    dictConfig({
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }},
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi']
        }
    })

    # start a task that refreshes worker names
    # rt = RepeatedTimer(10, refresh_worker_names)
    # return (rt,)


# class RepeatedTimer(object):
#     def __init__(self, interval, function, *args, **kwargs):
#         self._timer = None
#         self.function = function
#         self.interval = interval
#         self.args = args
#         self.kwargs = kwargs
#         self.is_running = False
#         self.start()

#     def _run(self):
#         self.is_running = False
#         self.start()
#         self.function(*self.args, **self.kwargs)

#     def start(self):
#         if not self.is_running:
#             self._timer = Timer(self.interval, self._run)
#             self._timer.start()
#             self.is_running = True

#     def stop(self):
#         self._timer.cancel()
#         self.is_running = False

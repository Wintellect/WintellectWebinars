from flask import Request


class RequestDictionary(dict):
    def __getattr__(self, key):
        return self.get(key)


def create(request: Request, **route_args) -> RequestDictionary:
    data = {
        **request.args,  # The key/value pairs in the URL query string
        **request.headers,  # Header values
        **request.form,  # The key/value pairs in the body, from a HTML post form
        **route_args  # And additional arguments the method access, if they want them merged.
    }

    return RequestDictionary(data)

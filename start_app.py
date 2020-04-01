from bottle import route, run, static_file

@route("/<filepath:path>")
def serveStatic(filepath):
    return static_file(filepath, root="")

run(host = "localhost", port = 8080)
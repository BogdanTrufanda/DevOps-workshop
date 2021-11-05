import random
from datetime import datetime

from kubernetes_api import get_worker_names
from helpers import run_shell_command
from workshop.backend.config import SHELL_COMMAND_TIMEOUT_SECONDS


def simple_execution(app, file_path):
    """
    Performs a "simple" execution against a pod.
    Chooses a random pod to compile & run the code in.
    """
    app.logger.info("Choosing a random worker...")
    try:
        pod_name = random.choice(get_worker_names())
    except (Exception,) as exc:
        stderr_msg = f"Could not choose a worker pod. Exception raised: {exc}"
        app.logger.error(stderr_msg)
        return {"stdout": "", "stderr": stderr_msg}
    app.logger.info(f"Chose worker {pod_name}")

    # Copy code
    cmd = "sudo"
    args = f"k0s kubectl -n workshop cp {file_path} {pod_name}:{file_path}".split()
    app.logger.info(
        f"Copying file {file_path} to pod {pod_name}...")
    try:
        exit_code, stdout, stderr = run_shell_command(cmd, args)
    except (Exception,) as exc:
        stderr_msg = f"Could not copy file {file_path} to pod {pod_name}. Exception raised: {exc}"
        app.logger.error(stderr_msg)
        return {"stdout": "", "stderr": stderr_msg}
    else:
        if exit_code != 0:
            stderr_msg = f"Could not copy file {file_path} to pod {pod_name}. Exit status: {exit_code}\nError:{stderr}"
            app.logger.error(stderr_msg)
            return {"stdout": "", "stderr": stderr_msg}
        app.logger.info(f"Copying result is {exit_code}, {stdout}, {stderr}")

    # Compile code
    compile_start = datetime.now()
    cmd = "sudo"
    args = ["k0s", "kubectl", "exec", "-itn", "workshop",
            f"{pod_name}", "--", "sh", "-c", f"timeout {SHELL_COMMAND_TIMEOUT_SECONDS} g++ {file_path} -o {file_path}.o"]
    app.logger.info(
        f"Compiling file {file_path} on pod {pod_name}...")
    try:
        exit_code, stdout, stderr = run_shell_command(cmd, args)
    except (Exception,) as exc:
        stderr_msg = f"Could not compile file {file_path} on pod {pod_name}. Exception raised: {exc}"
        app.logger.error(stderr_msg)
        return {"stdout": "", "stderr": stderr_msg}
    else:
        if exit_code != 0:
            stderr_msg = f"Could not compile file {file_path} on pod {pod_name}. Exit status: {exit_code}\nError:{stderr}"
            app.logger.error(stderr_msg)
            return {"stdout": "", "stderr": stderr_msg}
        app.logger.info(f"Compile result is {exit_code}, {stdout}, {stderr}")
    compile_end = datetime.now()

    # Run code
    run_start = datetime.now()
    cmd = 'sudo'
    args = ["k0s", "kubectl", "exec", "-itn", "workshop",
            f"{pod_name}", "--", "sh", "-c", f"timeout {SHELL_COMMAND_TIMEOUT_SECONDS} {file_path}.o"]
    app.logger.info(
        f"Running file {file_path}.o on pod {pod_name}...")
    try:
        exit_code, stdout, stderr = run_shell_command(cmd, args)
    except (Exception,) as exc:
        stderr_msg = f"Could not run file {file_path}.o on pod {pod_name}. Exception raised: {exc}"
        app.logger.error(stderr_msg)
        return {"stdout": "", "stderr": stderr_msg}
    else:
        if exit_code != 0:
            stderr_msg = f"Could not run file {file_path}.o on pod {pod_name}. Exit status: {exit_code}\nError:{stderr}"
            app.logger.error(stderr_msg)
            return {"stdout": "", "stderr": stderr_msg}
        app.logger.info(f"Execution result is {exit_code}, {stdout}, {stderr}")
    run_end = datetime.now()

    return {
        "stdout": stdout,
        "stderr": "",
        "stats": {
            "compilation_time": (compile_end - compile_start).microseconds / 1000,
            "run_time": (run_end - run_start).microseconds / 1000,
        }
    }


# Smarter execution ideas
# Don't choose pods randomly
# Batch file copying? Batch compilations? <- Only makes sense when there are many requests

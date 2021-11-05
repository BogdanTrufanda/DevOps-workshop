from config import WORKER_NAMESPACE
from helpers import run_shell_command


def get_worker_names():
    """Returns the name for all pods running in the workshop namespace"""
    cmd = 'sudo'
    args = f'k0s kubectl get pods --no-headers -o custom-columns=:metadata.name -n {WORKER_NAMESPACE}'
    exit_code, stdout, stderr = run_shell_command(cmd, args.split())
    if exit_code != 0 or stderr != '':
        raise RuntimeError(
            f"Could not get worker pods. Exit code: {exit_code}, stderr: {stderr}")
    if stdout == '':
        return []
    return stdout.rstrip().split("\n")


if __name__ == "__main__":
    print(get_worker_names())

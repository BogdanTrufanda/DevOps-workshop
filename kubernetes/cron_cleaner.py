#!/bin/python3
import subprocess


def get_worker_names(namespace):
    """Returns the name for all pods running in the workshop namespace"""
    cmd = 'sudo'
    args = f'k0s kubectl get pods --no-headers -o custom-columns=:metadata.name -n {namespace}'
    exit_code, stdout, stderr = run_shell_command(cmd, args.split(), 30)
    if exit_code != 0 or stderr != '':
        raise RuntimeError(
            f"Could not get worker pods. Exit code: {exit_code}, stderr: {stderr}")
    if stdout == '':
        return []
    return stdout.rstrip().split("\n")


def run_shell_command(command, command_args, timeout):
    """
    Runs a system command using bash.
    """
    child = subprocess.Popen([command, *command_args],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = child.communicate(timeout=timeout)
    return child.returncode, stdout.decode("utf-8"), stderr.decode("utf-8")



def main():
    namespace = "workshop"
    pod_list = get_worker_names(namespace)
    for pod in pod_list:
        exitcode, out, err = run_shell_command("sudo", ["k0s", "kubectl", "exec", "-it", f"{pod}", "-n", f"{namespace}", "--", "/bin/bash", "-c", "find /tmp ! -name script.sh -mmin +1 -type f -delete"], 30)
        if exitcode:
            subprocess.run(["sudo", "k0s", "kubectl", "delete", "pod", f"{pod}", "-n", f"{namespace}"])


if __name__ == "__main__":
    main()
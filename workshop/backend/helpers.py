"""
Helper functions
"""
import subprocess

from config import SHELL_COMMAND_TIMEOUT_SECONDS


def run_shell_command(command, command_args):
    """
    Runs a system command using bash.
    """
    child = subprocess.Popen([command, *command_args],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = child.communicate(timeout=SHELL_COMMAND_TIMEOUT_SECONDS)
    return child.returncode, stdout.decode("utf-8"), stderr.decode("utf-8")

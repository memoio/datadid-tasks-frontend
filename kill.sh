 #!/bin/bash
ps -ef | grep npm | grep -v 'color' | awk '{print $2}' | xargs kill -9
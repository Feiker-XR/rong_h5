# @Author: tusm
# @Date:   2016-03-12 21:43:40
# @Last Modified by:   tusm
# @Last Modified time: 2016-03-13 00:23:26

#!/bin/bash
#forever stopall;

#server
cd h5plus;
forever start server.js;
#node ./h5plus/server.js
#static
cd ../res;
forever start server.js;
#node ../res/server.js
echo 'shell nodejs running';

exit 0;

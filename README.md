# Mail board

The application has been created as an example usage of 
[vuex](http://vuex.vuejs.org/en/) library for meet.js Gdańsk [#15](https://www.facebook.com/events/1194835727296036/). 
Feel free to comment and contribute.

![Mail board](https://raw.githubusercontent.com/spartez/mail-board/master/static/mail-board.png)


### Running the app

To start:

```bash
$ npm install
$ npm run dev
```

Visit [http://localhost:4012](http://localhost:4012) and click the "SIGN IN" link in the upper right. Gmail threads from your mailbox should be loaded then.

### Studying the source code
A good place to start is `client/store/index.js` and `client/components/Board.vue`.

### How to start contributing
You can either ask me at [mateusz.zielinski@spartez.com](mateusz.zielinski@spartez.com) where to start or simply do something from the 
 list below:
 - create nice log-in screen,
 - fix design to be compliant with [Material Design](https://material.io),
 - fix loading images in e-mails,
 - add possibility to filter messages,
 - add search functionality,
 - finish the "respond" functionality,
 - make it possible to create new thread,
 - anything else you find interesting and worth doing.

### License:
```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

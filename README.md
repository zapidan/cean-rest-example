# CEAN Stack Example (Couchbase, ExpressJS, AngularJS, Node.js)

A basic example to try the CEAN stack and explore the new [N1QL syntax](http://developer.couchbase.com/documentation/server/4.0/getting-started/first-n1ql-query.html)

It implements some CRUD operations on users via REST calls from AngularJS, which are redirected by Node.js to the appropriate data layer methods (see [recordmodel.js](models/recordmodel.js))

### Requirements
Before using this app, the following need to be installed:
* [Node.js and npm](https://nodejs.org/en/)
* [Couchbase server 4.0+](http://www.couchbase.com/get-started-developing-nosql#Download_Couchbase_Server)

### Setup
After everything is installed there is a setup phase for the app to work, which consists on the following steps:

* Install dependencies:

```
npm install
```

* Prepare Couchbase
  * Create a new bucket called *restful-sample* using the Admin UI

  * Create an index from the command line using CBQ:
   Launch CBQ
    ```
    ./Applications/Couchbase Server.app/Contents/Resources/couchbase-core/bin/cbq
    ```
   Create an index:
   ```
   CREATE PRIMARY INDEX ON `restful-sample` USING GSI;
   ```

You are now ready to use the app.

###### Launch Couchbase Server
###### Run the app
```
node app.js
```

#### Configurable Properties
You can customize the bucket name in config.json
It is assumed you are using localhost and the following ports as default:
* 8091: default Couchbase port
* 5000: Node.js is bound to this port. You can change it in [config.json](config.json)

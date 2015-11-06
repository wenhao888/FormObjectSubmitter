# FormObjectSubmitter
javascript class for submitting object to Spring mvc controller. 

In Spring MVC programming using JSP, we have to map model object properties to html input elements (e.g. input, select).
Sometimes it is difficault to do such mapping, for example if end-user can dynamically add/delete elements inside an array. 

FormObjectSubmitter solves this problem by submitting an object directly to Spring mvc controller. Application 
programmers just need to call function submitObject(formId, objectValue, $event). 

This class is especially useful for web development using angular. The usage pattern is: inject model object 
from back-end to angular controller using ng-init, data-bind html elements to the model properties, and call "submitObject" to submit object to MVC controller.

Notice, the object is not submitted using ajax. The implementation uses a in-memory form to do the submission. Routing in MVC controllers still work. 


contact: wenhao.lin@gmail.com

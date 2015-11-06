function formObjectSubmitter() {
      var results = [];
      this.submitObject= function(formId, objectValue, $event) {
          $event.preventDefault();
          $event.stopPropagation();
          var form = generateForm(formId, objectValue);
          $(form).submit();
      };

      function generateForm(formId, objectValue) {
          results = [];
          collectValueElements("", objectValue);
          return render(formId);
      }

      function collectValueElements(namePrefix, value) {
          if (isNull(value) || isFunction(value)) {
              return;
          }

          if (isNull(value) || isFunction(value)) {
              //do nothing
          } else if (isArray(value)) {
              collectArrayElements(namePrefix, value);
          } else if (isObject(value)) {
              collectObjectElements(namePrefix, value);
          } else if (isDate(value)) {
              collectDateElements(namePrefix, value);
          } else {
              collectLiteralElements(namePrefix, value);
          }
      }


      function collectArrayElements(namePrefix, value) {
          for (var i = 0; i < value.length; i++) {
              collectValueElements(namePrefix + "[" + i + "]", value[i]);
          }
      }

      function collectObjectElements(namePrefix, value) {
          for (var key in value) {
              if (value.hasOwnProperty(key)) {
                  var name = namePrefix === "" ? key : namePrefix + "." + key
                  collectValueElements(name, value[key]);
              }
          }
      }

      function collectLiteralElements(namePrefix, value) {
          var e = {
              "name": namePrefix,
              "value": value
          };
          results.push(e);
      }

      function collectDateElements(namePrefix, dt) {
          var e = {
              "name": namePrefix,
              "value": dt.getTime()
          };
          results.push(e);
      }

      function render(formId) {
          var elements = [];
          results.forEach(function(e) {
              var element = String.format(
                  "<input type='hidden' name='{0}' value='{1}' /> ", "" + e.name,
                  "" + e.value
              );
              elements.push(element);
          });
          var action=$('#'+formId).attr("action");
          var method=$('#'+formId).attr("method");
          var body = elements.join("    ");
          var form = String.format(
              "<form id='{0}' action='{1}' method='{2}'>  {3}  </form> ", formId +
              "_magic", action, method , body);
          return form;
      }

      function isNull(value) {
          return (!value);
      }

      function isFunction(value) {
          return (typeof value === "function")
      }

      function isArray(value) {
          return (value instanceof Array);
      }

      function isObject(value) {
          return (typeof value === "object") && !isArray(value) && !isDate(value) &&
              !isNull(value);
      }

      function isDate(value) {
          return (value instanceof Date)
      }

      String.format = function() {
          var theString = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
              var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
              theString = theString.replace(regEx, arguments[i]);
          }
          return theString;
      };
  }

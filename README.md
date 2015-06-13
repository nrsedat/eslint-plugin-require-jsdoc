# eslint-plugin-require-jsdoc
This is a plugin for [eslint](http://eslint.org/) for enforcing all FUNCTIONS should have jsdoc.   
I had to write this because the [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc) rule in eslint did not help me to enforce that the functions MUST have a jsdoc. Instead it validated the jsdoc. So for the best results **use both together** to make sure **jsdoc is a must** for all methods and **they are valid**.

##usage
Follow the instructions [here](http://eslint.org/docs/user-guide/configuring#configuring-plugins)

eg:   
(in your eslintrc)   
```json
  "plugins": [   
    "require-jsdoc"   
  ],
  "rules": {   
    "require-jsdoc": 2,  
    "valid-jsdoc": 2   
  }   
```  

##future
In future I hope to add jsdoc validation as well. Hence two rules can be avoided.   
Please let me know your feedbacks.

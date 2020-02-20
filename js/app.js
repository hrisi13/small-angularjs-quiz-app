var app = angular.module("quizApp", []);

app.directive("quiz", function(quizFactory) {
	return {
		restrict: "AE",
		scope: {},
		templateUrl: "template.html",
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if (q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if (!$("input[name=answer]:checked").length) return;

				var ans = $("input[name=answer]:checked").val();

				if (ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			};

			scope.reset();
		}
	};
});

app.factory("quizFactory", function() {
	var questions = [
		{
			question: "How does an object or function can get hold of its dependencies in angular js?",
			options: [
				"Typically using the new operator, dependency can be created",
				"By referring to a global variable, dependency can be looked up",
				"Dependency can be passed into where it is required",
				"All of the above"
			],
			answer: 3
		},
		{
			question: "What is link function is used for in angular js?",
			options: [
				"It is used for registering DOM listeners as well as instance DOM manipulation",
				"It is used to retrieve object instances as defined by provider",
				"It is used for template DOM Manipulation and collect all of the directives",
				"The method traverses the DOM and matches the directives."
			],
			answer: 0
		},
		{
			question: "Explain what Angular JS routes does?",
			options: [
				"Automatic synchronization of data between the model and view components",
				"Enables you to create different URLs for different content in your application",
				"Link the template with scope by calling the linking function returned from the previous step",
				"To propagate any model changes through the system into the view from outside of the Angular realm"
			],
			answer: 1
		},
		{
			question: "What does the $dirty flag indicates in angular js?",
			options: [
				"it indicates the value cannot be changed",
				"It indicates the form has invalid data",
				"It indicates that value has been changed",
				"None of the above"
			],
			answer: 2
		},
		{
			question: "What is the factory method is used for?",
			options: [
				"It is used for creating the directive",
				"It is used for template DOM manipulation",
				"It is used for styling of form",
				"To check how code gets hold of its dependencies"
			],
			answer: 0
		}
	];

	return {
		getQuestion: function(id) {
			if (id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

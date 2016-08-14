/**
 * 
 */
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
var down = false;
var space = false;

$(function() {
	
	var classes = ['hi', 'medium', 'low'];
	var count = 20;
	var lives = 3;
	
	setInterval(function(){
		
		var randomN = Math.floor(Math.random() * 3);
		var theClass = classes[randomN];
		var newEl = document.createElement('img');
		newEl.src = "assets/images/ball.png";
		newEl.className = theClass;
		newEl.id = 'ball';
		$('#container').append(newEl);
		
		$('#ball').animate({left: '0px'}, 1500, function() {
			count--;
			$('#score').html(count);
			$('#ball').remove();
			
			if (lives == 0 && count > 0) {
				alert('Game over!');
				location.reload();
			}
			if (count <= 0 && lives > 0) {
				alert('You win :)');
				location.reload();
			}
		});
	
	}, 1600)
	
	$(document).on('keydown', function(e) {
		
		if (e.keyCode == KEY_UP) {
			$('#pi').css({bottom: '140px'});
			$('#pi').css({height: '350px'});
		}
		
		if (e.keyCode == KEY_DOWN) {
			$('#pi').css({height: '75px'});
			down = true;
		} 
		
		if (e.keyCode == KEY_SPACE) {
			space = true;
		} 
		
		if (space && down) {
			$('#pi').css({height: '75px'});
			$('#pi').css({bottom: '40px'});
		}
		
		if (e.keyCode == KEY_LEFT) {
			$('#pi').css({left: '-=5px'});
			if ($('#pi').offset().left <= 0){
				$('#pi').css({left: '0px'});
			}
		}
		
		if (e.keyCode == KEY_RIGHT) {
			$('#pi').css({left: '+=5px'});
			if ($('#pi').offset().left >= '752'){
				$('#pi').css({left: '752px'});
			}
		}
	})
	
	$(document).on('keyup', function(e) {
		
		if (e.keyCode == KEY_UP) {
			$('#pi').css({bottom: '80px'});
			$('#pi').css({height: 'auto'});
		}
		
		if (e.keyCode == KEY_DOWN) {
			$('#pi').css({height: 'auto'});
			down = false;
		} 
		
		if (e.keyCode == KEY_SPACE) {
			space = false;
		} 
		
		if (!space && !down) {
			$('#pi').css({height: 'auto'});
			$('#pi').css({bottom: '80px'});
		} 
	})
		
	function match() {
		if (!($('#ball').length)) {
			return;
		}
		
		var topPi = $('#pi').offset().top;
		var bottomPi = topPi + $('#pi').height();
		var leftPi = $('#pi').offset().left;
		var rightPi = leftPi + $('#pi').width();
		
		var topBall = $('#ball').offset().top;
		var bottomBall = topBall + $('#ball').height();
		var leftBall = $('#ball').offset().left;
		var rightBall = leftPi + $('#ball').width();
		
		if (topBall < bottomPi && bottomBall > topPi && rightBall > leftPi && leftBall < rightPi) {
			lives--;
			$('#lives').html(lives);
			$('#ball').remove();
		}
	}
	
	window.setInterval(function() {
			match();
	}, 50);

})


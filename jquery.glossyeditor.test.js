(function($, window, QUnit) {
    var tester = function(){
        return this;
    };
    tester.prototype = {
        rootEl: "test",
        setup: function(){
            this.rootEl += '_' + Math.floor((Math.random() * 99999999) + 10000000);
            $('body').prepend('<div id="' + this.rootEl + '" style="height:50%;"></div>');
            return this;
        },
        cleanUp: function(){
            if ($('#' + this.rootEl).is('div'))
                $('#' + this.rootEl).remove();
        },
        keyPress: function(item){
            for(var index in item)
                $('#' + this.rootEl).trigger({type: 'keypress', charCode: item.charCodeAt(index)});
            return this;
        },
        keyDown: function(item){
            $('#' + this.rootEl).trigger({type: 'keydown', keyCode: item});
            return this;
        }
    }
    
    QUnit.test( "basic test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('A');
        assert.equal(glossyeditor.content(), 'A');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "content method test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('Get').keyDown(32).keyPress('CONTENT');
        assert.equal(glossyeditor.content(), 'Get CONTENT');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "space and delete and backspace key test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('G').keyDown(32).keyPress('C');
        assert.equal(glossyeditor.content(), 'G C');
        test.keyDown(40).keyDown(8).keyDown(8).keyDown(8).keyPress('A B');
        assert.equal(glossyeditor.content(), 'A B');
        test.keyDown(40).keyDown(8).keyDown(8).keyDown(8).keyPress('QRS').keyDown(37).keyDown(46);
        assert.equal(glossyeditor.content(), 'QR');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "handleRenderContainer option test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({edititableElementId: 'glossy_legs',handleRenderContainer: function(){
            return '<div id="glossy_legs">Shiny: </div><br />';
        }});
        test.keyPress('AA');
        assert.equal(glossyeditor.content(), 'AA');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "blinking cursor option test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({blinkingCursor: false, fullScreenDemo: true});
        test.keyPress('BC');
        assert.equal(glossyeditor.content(), 'BC');
        setTimeout(function() {
            assert.equal($('#' + test.rootEl).find('.glossyeditor_blink').css('opacity') < 1, true);
            glossyeditor.hide();
            test.cleanUp();
        }, 1500 );
    });
    
    QUnit.test( "edititableElementId option test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({edititableElementId: 'glossy_legs'});
        test.keyPress('BC');
        assert.equal(glossyeditor.content(), 'BC');
        glossyeditor.hide();
        test.cleanUp();
    })

    QUnit.test( "backspace keypress test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('BC').keyDown(8);
        assert.equal(glossyeditor.content(), 'B');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "delete keypress test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('DE').keyDown(37).keyDown(46);
        assert.equal(glossyeditor.content(), 'D');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "period keypress test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('DE').keyDown(190).keyDown(190);
        assert.equal(glossyeditor.content(), 'DE..');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "font size test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({fontSize: 60, fullScreenDemo: true});
        test.keyPress('ABCD');
        assert.equal($('.glossyeditor-v-box').css('font-size'), '60px');
        assert.equal(glossyeditor.content(), 'ABCD');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "read only test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({readOnly: true});
        test.keyPress('DE');
        assert.equal(glossyeditor.content(), '');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "arrow keys test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        test.keyPress('ABCD').keyDown(38).keyPress('F').keyDown(39).keyPress('G').keyDown(37).keyPress('Q').keyDown(40).keyPress('Z');
        assert.equal(glossyeditor.content(), 'FAQGBCDZ');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "show cursor test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({showCursor:false});
        test.keyPress('ABCD');
        assert.equal(glossyeditor.content(), 'ABCD');
        assert.equal($('#' + test.rootEl).find('.glossyeditor_blink').is('div'), false);
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "full screen demo test", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({fullScreenDemo: true});
        test.keyPress('ABCD');
        assert.equal(glossyeditor.content(), 'ABCD');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.test( "default text", function( assert ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor({text: 'ABCD'});
        assert.equal(glossyeditor.content(), 'ABCD');
        glossyeditor.hide();
        test.cleanUp();
    });
    
    QUnit.done(function( details ) {
        var test = new tester().setup();
        var glossyeditor = $('#' + test.rootEl).glossyeditor();
        
        var targetString = 'Have all the tests passed?';
        test.keyPress(targetString);
    });
})(jQuery, window, QUnit);
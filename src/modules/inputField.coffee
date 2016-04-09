################################################################################
# Created 07 Jan 2016 by Jordan Robert Dobson / @jordandobson / JordanDobson.com
################################################################################
#
# Valid & Tested InputField Types: "text", "email", "number", "url", "tel", "password", "search"
#
# These types REQUIRE a value: property in the correct format and IGNORE the placeholder property.
#
#   * time: "12:38"
#   * month: "2016-01"
#   * date: "2016-01-04"
#   * datetime-local: "2016-01-04T12:44:31.192"
#
################################################################################


class exports.InputField extends Layer

	PATTERN_NUMBER = "[0-9]*"

	constructor: (@options={}) ->
		# DEFAULT
		@.options.backgroundColor  ?= ""
		@.options.borderRadius     ?= 0
		@.options.fontSize         ?= 32
		@.options.indent           ?= 0
		@.options.placeHolderFocus ?= null
		@.options.type             ?= "text"
		@.options.name             ?= "#{@.options.type}Input"

		if @.options.superLayer?
			@.options.width  ?= @.options.maxWidth or @.options.superLayer.width
			@.options.height ?= @.options.superLayer.height

		@.options.minX ?= @.options.x or 0
		@.options.minY ?= @.options.y or 0

		if @.options.superLayer? and not @.options.maxWidth
			@.options.maxX ?= @.options.superLayer?.width
			@.options.maxY ?= @.options.superLayer?.height

		@.options.onInputFunction ?= null
		@.options.onBlurFunction  ?= null
		@.options.onBlurFunction  ?= null

		if @.options.type is "number"
			@.options.type    = "text"
			@.options.pattern = PATTERN_NUMBER

		super @.options

		if @.options.type is "text" and @.options.pattern is PATTERN_NUMBER
			@.html = """
				<style type='text/css'>
					input[type=number]::-webkit-inner-spin-button,
					input[type=number]::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0; }
				</style>"""

		@.input = document.createElement "input"

		@.input.type        = @.options.type
		@.input.value       = @.options.value                  if @.options.value?
		@.input.placeholder = @.options.placeHolder            if @.options.placeHolder?
		@.input.pattern     = @.options.pattern                if @.options.pattern?
		@.input.setAttribute("maxLength", @.options.maxLength) if @.options.maxLength?
		@.input.setAttribute("autocapitalize", (if @.options.autoCapitalize is true then "on" else "off"))

		@._element.appendChild @.input

		inputStyle =
			font: "300 #{@.options.fontSize}px/1.25 -apple-system, Helvetica Neue"
			outline: "none"
			textIndent: "#{@.options.indent}px"
			backgroundColor: "transparent"
			height: "100%"
			width:  "100%"
			pointerEvents: "none"
			"-webkit-appearance": "none"

		@.input.style[key]  = val for key, val of inputStyle
		@.input.style.color = @.options.color if @.options.color?

		@.input.onfocus = =>
			document.body.scrollTop = 0
			@.input.placeholder = @.options.placeHolderFocus if @.options.placeHolderFocus?
			document.body.scrollTop = 0
			@.options.onFocusFunction(@.input.value, @.name) if @.options.onFocusFunction?

		@.input.onblur  = =>
			document.body.scrollTop = 0
			unless @.input.placeholder is @.options.placeHolder or !@.options.placeHolder?
				@.input.placeholder = @.options.placeHolder
			@.options.onBlurFunction(@.input.value, @.name) if @.options.onBlurFunction?

		@.on Events.TouchEnd, -> @.input.focus()

		@.input.oninput = =>
			@.options.onInputFunction(@.input.value, @.name) if @.options.onInputFunction?

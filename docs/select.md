[textinput]: https://reactnative.dev/docs/textinput#props
[touchable]: https://reactnative.dev/docs/touchablewithoutfeedback#props
[textfield]: ./textfields.md

Material dropdown with consistent behaviour on iOS and Android

## Features

* Easy to use
* Consistent look and feel on iOS and Android
* Customizable font size, colors and animation duration
* Dynamic dropdown size and position
* Configurable visible item count
* RTL support
* Pure javascript implementation

## Usage

```javascript
import React, { Component } from 'react';
import { Select } from 'react-native-material-basic';

class Example extends Component {
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <Select
        label='Favorite Fruit'
        data={data}
      />
    );
  }
}
```

## Properties

 name              | description                                   | type     | default
:----------------- |:--------------------------------------------- | --------:|:------------------
 label             | Text field label text                         |   String | -
 error             | Text field error text                         |   String | -
 animationDuration | Text field animation duration in ms           |   Number | 225
 fontSize          | Text field font size                          |   Number | 16
 labelFontSize     | Text field label font size                    |   Number | 12
 baseColor         | Text field base color                         |   String | rgba(0, 0, 0, .38)
 textColor         | Text field text color                         |   String | rgba(0, 0, 0, .87)
 itemColor         | Dropdown item text color (inactive item)      |   String | rgba(0, 0, 0, .54)
 selectedItemColor | Dropdown item text color (active item)        |   String | rgba(0, 0, 0, .87)
 disabledItemColor | Dropdown item text color (disabled item)      |   String | rgba(0, 0, 0, .38)
 dropdownPosition  | Dropdown position (dynamic if undefined)      |   Number | -
 itemCount         | Dropdown visible item count                   |   Number | 4
 itemPadding       | Dropdown item vertical padding                |   Number | 8
 itemTextStyle     | Dropdown item text styles                     |   Object | -
 dropdownOffset    | Dropdown offset                               |   Object | { top: 32, left: 0 }
 dropdownMargins   | Dropdown margins                              |   Object | { min: 8, max: 16 }
 data              | Dropdown item data                            |    Array | []
 value             | Selected value                                |   String | -
 containerStyle    | Styles for container view                     |   Object | -
 overlayStyle      | Styles for overlay view                       |   Object | -
 pickerStyle       | Styles for item picker view                   |   Object | -
 shadeOpacity      | Shade opacity for dropdown items              |   Number | 0.12
 rippleOpacity     | Opacity for ripple effect                     |   Number | 0.54
 rippleInsets      | Insets for ripple on base component           |   Object | { top: 0, bottom: -17 }
 rippleCentered    | Ripple on base component should be centered   |  Boolean | false
 renderBase        | Render base component                         | Function | -
 renderAccessory   | Render text field accessory                   | Function | -
 valueExtractor    | Extract value from item (args: item, index)   | Function | ({ value }) => value
 labelExtractor    | Extract label from item (args: item, index)   | Function | ({ label }) => label
 propsExtractor    | Extract props from item (args: item, index)   | Function | () => null
 onChangeText      | Selection callback (args: value, index, data) | Function | -

Other [TextField][textfield], [TextInput][textinput] and [TouchableWithoutFeedback][touchable] properties will also work

## Methods

 name            | description                    | returns
:--------------- |:------------------------------ |:--------
 focus()         | Acquire focus (open dropdown)  | -
 blur()          | Release focus (close dropdown) | -
 value()         | Get current value              | String
 selectedIndex() | Get selected index             | Number
 selectedItem()  | Get selected item              | Object
 isFocused()     | Get current focus state        | Boolean

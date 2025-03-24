import { WapJSON } from "@/types/flowJSON";

// Updated WAP JSON with checkbox screen
export const wapJSON: WapJSON = {
    "version": "7.0",
    "data_api_version": "3.0",
    "routing_model": {},
    "screens": [
        {
            "id": "DEMO_SCREEN",
            "title": "Demo Screen",
            "terminal": true,
            "layout": {
                "type": "SingleColumnLayout",
                "children": [
                    {
                        "type": "Form",
                        "name": "text_input_form",
                        "init-values": {
                            "text input": "This is text input",
                            "text area": "This is text area"
                        },
                        "children": [
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Text Input",
                                "name": "text input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Number Input",
                                "input-type": "number",
                                "name": "number input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Email Input",
                                "input-type": "email",
                                "name": "email input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Password Input",
                                "input-type": "password",
                                "name": "password input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Passcode Input",
                                "input-type": "passcode",
                                "name": "passcode input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Phone Input",
                                "input-type": "phone",
                                "name": "phone input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Regex Input",
                                "input-type": "text",
                                "pattern": "^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
                                "helper-text": "E.g. 1993-08-04",
                                "name": "regex input"
                            },
                            {
                                "type": "TextInput",
                                "required": true,
                                "label": "Regex Passcode",
                                "pattern": "007",
                                "input-type": "passcode",
                                "name": "passcode_oo7",
                                "helper-text": "Contains: 007"
                            },
                            {
                                "type": "TextArea",
                                "required": true,
                                "label": "Text Area",
                                "name": "text area"
                            },
                            {
                                "type": "Footer",
                                "label": "Continue",
                                "on-click-action": {
                                    "name": "complete",
                                    "payload": {}
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "id": "DEMO_SCREEN_1",
            "title": "Demo Screen 1",
            "terminal": false,
            "layout": {
                "type": "SingleColumnLayout",
                "children": [
                    {
                        "type": "TextHeading",
                        "text": "This is a heading",
                        "visible": true
                    },
                    {
                        "type": "TextSubheading",
                        "text": "This is a subheading",
                        "visible": true
                    },
                    {
                        "type": "TextBody",
                        "text": "This is body text"
                    },
                    {
                        "type": "TextCaption",
                        "text": "This is a text caption"
                    },
                    {
                        "type": "Footer",
                        "label": "Continue",
                        "on-click-action": {
                            "name": "complete",
                            "payload": {}
                        }
                    }
                ]
            }
        },
        {
            "id": "DEMO_SCREEN_2",
            "title": "Markdown Features",
            "terminal": false,
            "layout": {
                "type": "SingleColumnLayout",
                "children": [
                    {
                        "type": "RichText",
                        "text": [
                            "**hello**",
                            "---",
                            "- it's a me"
                        ]
                    },
                    {
                        "type": "Footer",
                        "label": "Next",
                        "on-click-action": {
                            "name": "complete",
                            "payload": {}
                        }
                    }
                ]
            }
        },
        {
            "id": "CHECKBOX_DEMO_SCREEN",
            "title": "Demo screen",
            "terminal": true,
            "data": {
                "all_extras": [
                    {
                        "id": "1",
                        "title": "Fries"
                    },
                    {
                        "id": "2",
                        "title": "Coleslaw"
                    }
                ]
            },
            "layout": {
                "type": "SingleColumnLayout",
                "children": [
                    {
                        "type": "Form",
                        "name": "checkbox_example_form",
                        "children": [
                            {
                                "type": "CheckboxGroup",
                                "name": "extras",
                                "label": "Extras:",
                                "description": "Pick something to go with your meal",
                                "required": true,
                                "data-source": "${data.all_extras}",
                                "on-select-action": {
                                    "name": "data_exchange",
                                    "payload": {
                                        "extras": "${form.extras}"
                                    }
                                }
                            },
                            {
                                "type": "Footer",
                                "label": "Continue",
                                "on-click-action": {
                                    "name": "data_exchange",
                                    "payload": {}
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "id": "DEMO_SCREEN_3",
            "title": "Final Screen",
            "terminal": true,
            "layout": {
                "type": "SingleColumnLayout",
                "children": [
                    {
                        "type": "TextHeading",
                        "text": "Final Screen",
                        "visible": true
                    },
                    {
                        "type": "TextBody",
                        "text": "This is the last screen of the flow"
                    },
                    {
                        "type": "TextCaption",
                        "text": "Thank you for using our service"
                    },
                    {
                        "type": "Footer",
                        "label": "Finish",
                        "on-click-action": {
                            "name": "complete",
                            "payload": {}
                        }
                    }
                ]
            }
        }
    ]
};

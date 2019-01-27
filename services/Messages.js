import { showMessage } from "react-native-flash-message";

export default class Messages {
    static alert(text) {
        showMessage({
            message: text,
            position: "bottom",
            type: "info",
            duration: 2000
        })
    }
}
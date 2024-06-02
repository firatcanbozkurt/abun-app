import { View, Text } from "react-native";
import React, {useState} from "react";
import Tooltip,{TouchableHighlight} from "react-native-walkthrough-tooltip";
import { TouchableOpacity } from "react-native-gesture-handler";

 const ToolTipComponent = () => {
  const [toolTip, setToolTip] = useState(false);
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Tooltip
        isVisible={toolTip}
        content={<Text>Check this out!</Text>}
        placement="bottom"
        onClose={() => setToolTip(false)}
      >
        <TouchableOpacity onPress={() => setToolTip(true)}>
          <Text>Click Me!</Text>
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};


export default ToolTipComponent;

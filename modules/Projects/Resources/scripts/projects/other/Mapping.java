package projects.other;

import java.util.HashMap;
import java.util.Map;

public class Mapping {

    public Map get(){
        Map<String, Object> jsonMap = new HashMap<>();
        Map<String, Object> routing = new HashMap<>();
        Map<String, Object> properties = new HashMap<>();

        Map<String, String> typeField = new HashMap<>();
        typeField.put("type", "text");
      //  typeField.put("dynamic", "strict");


        properties.put("type", typeField);


        jsonMap.put("properties", properties);
        routing.put("required", true);
        jsonMap.put("_routing", routing);
        return jsonMap;
   }

}
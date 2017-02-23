import b_a_00 from '../data/balancing_areas/b_a_00';
import b_a_01 from '../data/balancing_areas/b_a_01';
import b_a_02 from '../data/balancing_areas/b_a_02';
import b_a_03 from '../data/balancing_areas/b_a_03';
import b_a_04 from '../data/balancing_areas/b_a_04';
import b_a_05 from '../data/balancing_areas/b_a_05';
import b_a_06 from '../data/balancing_areas/b_a_06';
import b_a_07 from '../data/balancing_areas/b_a_07';
import b_a_08 from '../data/balancing_areas/b_a_08';
import b_a_09 from '../data/balancing_areas/b_a_09';

const country = { "type" : "BalancingAreaCollection",
                  "name" : "Mexico",
                  "balancingAreas": [
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"08-baja_california", "name":"Baja California", "shape": b_a_08, "color":"#756BB1"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"09-baja_california_sur", "name":"Baja California Sur", "shape": b_a_09, "color":"#7fc97f"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"04-noroeste", "name":"Noroeste", "shape": b_a_04, "color":"#636363"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"05-norte", "name":"Norte", "shape": b_a_05, "color":"#E34A33"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"06-noreste", "name":"Noreste", "shape": b_a_06, "color":"#feb24c"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"03-occidental", "name":"Occidental", "shape": b_a_03, "color":"#e41a1c"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"01-central", "name":"Central", "shape": b_a_01, "color":"#2CA25F"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"02-oriental", "name":"Oriental", "shape": b_a_02, "color":"#2B8CBE"}
                    }
                    ,
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"07-peninsular", "name":"Peninsular", "shape": b_a_07, "color":"#C51B8A"}
                    }
                  ]

                };

export default country;

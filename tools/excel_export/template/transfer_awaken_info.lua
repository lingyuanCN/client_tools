

---@classdef record_transfer_awaken_info
local record_transfer_awaken_info = {}
  
record_transfer_awaken_info.profession_code = 0 --职业码  
record_transfer_awaken_info.profession_level = 0 --职业阶数  
record_transfer_awaken_info.profession_name = "" --职业名称  
record_transfer_awaken_info.profession_quality = 0 --职业名称  
record_transfer_awaken_info.profession_star = "" --主角星数  
record_transfer_awaken_info.profession_effect = "" --职业特效  
record_transfer_awaken_info.profession_title_pic = "" --职业头衔底  
record_transfer_awaken_info.profession_skill_icon = "" --职业技能icon  
record_transfer_awaken_info.profession_skill_quality = 0 --职业技能品质  
record_transfer_awaken_info.promote_skill_icon = "" --晋升技能icon  
record_transfer_awaken_info.promote_skill_quality = 0 --晋升技能品质  
record_transfer_awaken_info.profession_level_skill_icon = "" --头衔技能icon  
record_transfer_awaken_info.profession_level_skill_quality = 0 --头衔技能品质  
record_transfer_awaken_info.limit_type_1 = 0 --条件类型  
record_transfer_awaken_info.limit_value_1 = 0 --条件值  
record_transfer_awaken_info.limit_type_2 = 0 --条件类型  
record_transfer_awaken_info.limit_value_2 = 0 --条件值  
record_transfer_awaken_info.cost_type = 0 --消耗类型  
record_transfer_awaken_info.cost_value = 0 --消耗值  
record_transfer_awaken_info.cost_size = 0 --消耗数量  
record_transfer_awaken_info.instrument_id = 0 --法器  
record_transfer_awaken_info.profession_skill_id = 0 --职业技能id  
record_transfer_awaken_info.promote_skill_id = 0 --进阶技能id  
record_transfer_awaken_info.profession_level_skill_id = 0 --头衔技能id  
record_transfer_awaken_info.profession_level_value = 0 --头衔技能压制系数  
record_transfer_awaken_info.strength_type_1 = 0 --增加属性1类型  
record_transfer_awaken_info.strength_value_1 = 0 --增加属性1类型值  
record_transfer_awaken_info.strength_type_2 = 0 --增加属性2类型  
record_transfer_awaken_info.strength_value_2 = 0 --增加属性2类型值  
record_transfer_awaken_info.strength_type_3 = 0 --增加属性3类型  
record_transfer_awaken_info.strength_value_3 = 0 --增加属性3类型值  
record_transfer_awaken_info.strength_type_4 = 0 --增加属性4类型  
record_transfer_awaken_info.strength_value_4 = 0 --增加属性4类型值


transfer_awaken_info = {
   _data = {
    [1] = {1,1,"儒童",5,"0","effect_pfw_long1","title_pic_001","1001",7,"1002",7,"1000",10,0,0,0,0,0,0,0,300001,810000,0,317,700,26,100,46,0,44,0,0,0,},
    [2] = {1,2,"儒生",6,"1","effect_pfw_long1","title_pic_002","1001",7,"1002",7,"1000",10,1,100,3,20,3,6447,16,300001,810000,0,317,700,26,100,46,0,44,50,0,0,},
    [3] = {1,3,"儒士",7,"2","effect_pfw_long2","title_pic_003","1001",7,"1002",7,"1000",10,2,1500000000,3,50,3,6448,12,300001,810000,0,317,700,26,150,46,50,44,50,0,0,},
    [4] = {1,4,"鸿儒",9,"3","effect_pfw_long3","title_pic_004","1001",9,"1002",9,"1000",10,1,110,3,100,3,6449,10,300001,810001,810010,317,700,26,200,46,50,44,100,0,0,},
    [5] = {1,5,"祭酒",10,"4","effect_pfw_long4","title_pic_005","1001",9,"1002",9,"1000",10,2,3500000000,3,200,3,6450,8,300001,810001,810011,317,700,26,250,46,100,44,100,0,0,},
    [6] = {1,6,"儒圣",11,"5","effect_pfw_long5","title_pic_006","1001",10,"1002",10,"1000",10,1,120,3,250,3,6451,6,300001,810002,810012,317,700,26,300,46,150,44,150,0,0,},
    [7] = {1,7,"帝师",12,"5","effect_pfw_long6","title_pic_007","1001",11,"1002",11,"1000",10,2,27000000000,3,350,3,7803,4,300001,810003,810013,317,700,26,400,46,200,44,200,0,0,},
    [8] = {2,1,"观桥",5,"0","effect_pfw_niao1","title_pic_001","2001",7,"2002",7,"1000",10,0,0,0,0,0,0,0,300002,820000,0,318,700,26,100,46,0,44,0,0,0,},
    [9] = {2,2,"学徒",6,"1","effect_pfw_niao1","title_pic_002","2001",7,"2002",7,"1000",10,1,100,3,20,3,6447,16,300002,820000,0,318,700,26,100,46,0,44,50,0,0,},
    [10] = {2,3,"百工",7,"2","effect_pfw_niao2","title_pic_003","2001",7,"2002",7,"1000",10,2,1500000000,3,50,3,6448,12,300002,820000,0,318,700,26,150,46,50,44,50,0,0,},
    [11] = {2,4,"匠人",9,"3","effect_pfw_niao3","title_pic_004","2001",9,"2002",9,"1000",10,1,110,3,100,3,6449,10,300002,820001,820010,318,700,26,200,46,50,44,100,0,0,},
    [12] = {2,5,"匠师",10,"4","effect_pfw_niao4","title_pic_005","2001",9,"2002",9,"1000",10,2,3500000000,3,200,3,6450,8,300002,820001,820011,318,700,26,250,46,100,44,100,0,0,},
    [13] = {2,6,"矩子",11,"5","effect_pfw_niao5","title_pic_006","2001",10,"2002",10,"1000",10,1,120,3,250,3,6451,6,300002,820002,820012,318,700,26,300,46,150,44,150,0,0,},
    [14] = {2,7,"匠神",12,"5","effect_pfw_niao6","title_pic_007","2001",11,"2002",11,"1000",10,2,27000000000,3,350,3,7803,4,300002,820003,820013,318,700,26,400,46,200,44,200,0,0,},
    [15] = {3,1,"道童",5,"0","effect_pfw_yu1","title_pic_001","3001",7,"3002",7,"1000",10,0,0,0,0,0,0,0,300003,830000,0,319,700,26,100,46,0,44,0,0,0,},
    [16] = {3,2,"道士",6,"1","effect_pfw_yu1","title_pic_002","3001",7,"3002",7,"1000",10,1,100,3,20,3,6447,16,300003,830000,0,319,700,26,100,46,0,44,50,0,0,},
    [17] = {3,3,"真人",7,"2","effect_pfw_yu2","title_pic_003","3001",7,"3002",7,"1000",10,2,1500000000,3,50,3,6448,12,300003,830000,0,319,700,26,150,46,50,44,50,0,0,},
    [18] = {3,4,"天师",9,"3","effect_pfw_yu3","title_pic_004","3001",9,"3002",9,"1000",10,1,110,3,100,3,6449,10,300003,830001,830010,319,700,26,200,46,50,44,100,0,0,},
    [19] = {3,5,"道君",10,"4","effect_pfw_yu4","title_pic_005","3001",9,"3002",9,"1000",10,2,3500000000,3,200,3,6450,8,300003,830001,830011,319,700,26,250,46,100,44,100,0,0,},
    [20] = {3,6,"道尊",11,"5","effect_pfw_yu5","title_pic_006","3001",10,"3002",10,"1000",10,1,120,3,250,3,6451,6,300003,830002,830012,319,700,26,300,46,150,44,150,0,0,},
    [21] = {3,7,"真君",12,"5","effect_pfw_yu6","title_pic_007","3001",11,"3002",11,"1000",10,2,27000000000,3,350,3,7803,4,300003,830003,830013,319,700,26,400,46,200,44,200,0,0,},
    [22] = {4,1,"门生",5,"0","effect_pfw_lingpai1","title_pic_001","4001",7,"4002",7,"1000",10,0,0,0,0,0,0,0,300004,840000,0,320,700,26,100,46,0,44,0,0,0,},
    [23] = {4,2,"小吏",6,"1","effect_pfw_lingpai1","title_pic_002","4001",7,"4002",7,"1000",10,1,100,3,20,3,6447,16,300004,840000,0,320,700,26,100,46,0,44,50,0,0,},
    [24] = {4,3,"曹掾",7,"2","effect_pfw_lingpai2","title_pic_003","4001",7,"4002",7,"1000",10,2,1500000000,3,50,3,6448,12,300004,840000,0,320,700,26,150,46,50,44,50,0,0,},
    [25] = {4,4,"廷尉",9,"3","effect_pfw_lingpai3","title_pic_004","4001",9,"4002",9,"1000",10,1,110,3,100,3,6449,10,300004,840001,840010,320,700,26,200,46,50,44,100,0,0,},
    [26] = {4,5,"司寇",10,"4","effect_pfw_lingpai4","title_pic_005","4001",9,"4002",9,"1000",10,2,3500000000,3,200,3,6450,8,300004,840001,840011,320,700,26,250,46,100,44,100,0,0,},
    [27] = {4,6,"法尊",11,"5","effect_pfw_lingpai5","title_pic_006","4001",10,"4002",10,"1000",10,1,120,3,250,3,6451,6,300004,840002,840012,320,700,26,300,46,150,44,150,0,0,},
    [28] = {4,7,"刑圣",12,"5","effect_pfw_lingpai6","title_pic_007","4001",11,"4002",11,"1000",10,2,27000000000,3,350,3,7803,4,300004,840003,840013,320,700,26,400,46,200,44,200,0,0,},
    }
}



local __index_profession_code_profession_level = {
    ["1_1"] = 1,
    ["1_2"] = 2,
    ["1_3"] = 3,
    ["1_4"] = 4,
    ["1_5"] = 5,
    ["1_6"] = 6,
    ["1_7"] = 7,
    ["2_1"] = 8,
    ["2_2"] = 9,
    ["2_3"] = 10,
    ["2_4"] = 11,
    ["2_5"] = 12,
    ["2_6"] = 13,
    ["2_7"] = 14,
    ["3_1"] = 15,
    ["3_2"] = 16,
    ["3_3"] = 17,
    ["3_4"] = 18,
    ["3_5"] = 19,
    ["3_6"] = 20,
    ["3_7"] = 21,
    ["4_1"] = 22,
    ["4_2"] = 23,
    ["4_3"] = 24,
    ["4_4"] = 25,
    ["4_5"] = 26,
    ["4_6"] = 27,
    ["4_7"] = 28,

}

local __key_map = {
  profession_code = 1,
  profession_level = 2,
  profession_name = 3,
  profession_quality = 4,
  profession_star = 5,
  profession_effect = 6,
  profession_title_pic = 7,
  profession_skill_icon = 8,
  profession_skill_quality = 9,
  promote_skill_icon = 10,
  promote_skill_quality = 11,
  profession_level_skill_icon = 12,
  profession_level_skill_quality = 13,
  limit_type_1 = 14,
  limit_value_1 = 15,
  limit_type_2 = 16,
  limit_value_2 = 17,
  cost_type = 18,
  cost_value = 19,
  cost_size = 20,
  instrument_id = 21,
  profession_skill_id = 22,
  promote_skill_id = 23,
  profession_level_skill_id = 24,
  profession_level_value = 25,
  strength_type_1 = 26,
  strength_value_1 = 27,
  strength_type_2 = 28,
  strength_value_2 = 29,
  strength_type_3 = 30,
  strength_value_3 = 31,
  strength_type_4 = 32,
  strength_value_4 = 33,

}



local m = { 
    __index = function(t, k) 
        if k == "toObject" then
            return function()  
                local o = {}
                for key, v in pairs (__key_map) do 
                    o[key] = t._raw[v]
                end
                return o
            end 
        end
        
        assert(__key_map[k], "cannot find " .. k .. " in record_transfer_awaken_info")
        
        
        return t._raw[__key_map[k]]
    end
}


function transfer_awaken_info.getLength()
    return #transfer_awaken_info._data
end



function transfer_awaken_info.hasKey(k)
  if __key_map[k] == nil then
    return false
  else
    return true
  end
end


---
--@return @class record_transfer_awaken_info
function transfer_awaken_info.indexOf(index)
    if index == nil then
        return nil
    end
    
    return setmetatable({_raw = transfer_awaken_info._data[index]}, m)
    
end

---
--@return @class record_transfer_awaken_info
function transfer_awaken_info.get(profession_code,profession_level)
    
    local k = profession_code .. '_' .. profession_level
    return transfer_awaken_info.indexOf(__index_profession_code_profession_level[k])
        
end



function transfer_awaken_info.set(profession_code,profession_level, key, value)
    local record = transfer_awaken_info.get(profession_code,profession_level)
    if record then
        local keyIndex = __key_map[key]
        if keyIndex then
            record._raw[keyIndex] = value
        end
    end
end




function transfer_awaken_info.get_index_data()
    return __index_profession_code_profession_level
end
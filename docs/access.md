Roles:
 * Guest
 * Member/User
 * Mod
 * Admin

 USER{
   aliasid,
   alias,
   passphrase,
   email,
   dateCreate,
   dateBirth,
   role,//guest, user, mod, admin
   ban, // false
   banTime,//0 = permanent, 1800= tmp ban time
   isFlag,
   x messagecount,
   x notifycount,
}

MESSAGE{
  aliasidfrom,
  aliasidto,
  subject,
  content,
  isDelete,
  x isHidden,
  isRead,
}

ROLE{
  name, // user, mod, admin
  isRead,
  isWrite,
  isPost,
  isEdit,
  isDelete,
  isArchive,
  isReport
}

Board{
  id,
  title,
  description,
  createData,
  roles,
  isHidden,
  isLocked,
  x isPassphrase,
  parentId,
}

POST{
  aliasid,
  title,
  description,
  content,
  createDate,
  isBan,
  isHidden,
  isLocked,
  index,
}

COMMENT{
  aliasid,
  content,
  isBan,
  isHidden,
  index,
}

EVENT{
  id,
  title,
  description,
  eventType, //TIME, NEWS
  startDate,
  startTime,
  endDate,
  endTime,
  isDisable,
}
//===============================================
THEME{
  button,
  header,
  panel,
  ...
}


//===============================================

GAMEEVENT{
  id,
  title,
  description,
  eventType, //TIME, NEWS
  startDate,
  startTime,
  endDate,
  endTime,
  isDisable,
}

GAMEACCESS{
  isUserAllow,
  isRegister,
}


BaseStation{
  id,
  name,
  location_map,
  location_region,
  location_sector,
  location_position,
}

BaseStation{
  parentid,
  id,
  name,
  position,
  blocktype,
  health,
  armor,
  shield,
  isRes,
}

BlockShip{
  id,
  name,
  location_map,
  location_region,
  location_sector,
  location_position,
}

ShipPart{
  id,
  name,
  position,
  type,
  health,
  armor,
  shield,
  params,
}
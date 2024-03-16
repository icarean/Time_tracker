[assert(macro.args!="","You cannot call this macro without any args.  Aborting.")]

[h: setLibProperty(getStrProp(macro.args, "Property"), getStrProp(macro.args, "Data"))]

[h: result=json.set("{}", "OK", macro.args)]
[r: result]
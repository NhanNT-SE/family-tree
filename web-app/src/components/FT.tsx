/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
const FT = ({ nodes, admin }: { nodes: any; admin: boolean }) => {
  const divRef = useRef<any>();
  const family = useRef<any>();
  useEffect(() => {
    FamilyTree.templates.tommy_male.field_0 =
      '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_male.field_1 =
      '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_male.field_2 =
      '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_male.field_3 =
      '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_female.field_0 =
      '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_female.field_1 =
      '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_female.field_2 =
      '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
    FamilyTree.templates.tommy_female.field_3 =
      '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
    initData();
  }, [nodes]);

  const initData = (nodesRender?: any) => {
    let options: any = {
      nodes: nodesRender ? nodesRender : nodes,
      mouseScrool: FamilyTree.action.none,
      searchFields: ["bod"],
      nodeMouseClick: FamilyTree.action.none,
      nodeBinding: {
        field_0: "name",
        field_1: "gender",
        field_2: "email",
        field_3: "bod",
      },
    };
    if (admin) {
      options.nodeMenu = {
        edit: { text: "Edit" },
        remove: { text: "Remove" },
      };
      options.nodeTreeMenu = true;
      options.enableSearch = false;
    }
    family.current = new FamilyTree(divRef.current, options);
  };
  return <div id="tree" ref={divRef}></div>;
};

export default FT;

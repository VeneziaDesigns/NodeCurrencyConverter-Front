export interface CytoscapeNode {
  data: {
    id: string;
    label: string;
  };
}

export interface CytoscapeEdge {
  data: {
    id: string;
    source: string;
    target: string;
  };
}

export type CytoscapeElement = CytoscapeNode | CytoscapeEdge;

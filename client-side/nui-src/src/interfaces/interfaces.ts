export interface NuiDataFrame {
  value: number;
  setValue: (value: number) => void;
}

export interface NuiVisibilityFrame {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}

export interface NuiMessageDataFrame<T = any> {
  action: string;
  payload: T;
}

export interface NuiDebugEventFrame {
  action: string;
  payload: any;
}

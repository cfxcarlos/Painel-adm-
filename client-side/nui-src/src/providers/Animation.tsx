import { Component } from "react";

const duration = 200;

const transitionStyle = (state: string) => {
  if (state === "entered") {
    return { opacity: 1, transition: `opacity ${duration}ms ease` };
  } else {
    return { opacity: 0, transition: `opacity ${duration}ms ease` };
  }
};

interface TProps {
  children: React.ReactNode;
  show: boolean;
}

interface TState {
  status: string;
}

export class AnimationProvider extends Component<TProps, TState> {
  static defaultProps: { show: boolean };
  constructor(props: TProps) {
    super(props);

    this.state = { status: "unmounted" };
  }

  componentDidMount() {
    const { show } = this.props;
    if (show) {
      this.performEnter();
    }
  }

  componentDidUpdate(prevProps: TProps) {
    let nextStatus = null;
    if (prevProps !== this.props) {
      const { status } = this.state;
      if (this.props.show) {
        if (status !== "entering" && status !== "entered") {
          nextStatus = "entering";
        }
      } else {
        if (status === "entering" || status === "entered") {
          nextStatus = "exiting";
        }
      }
    }
    this.updateStatus(nextStatus);
  }

  updateStatus(nextStatus: string | null) {
    if (nextStatus !== null) {
      if (nextStatus === "entering") {
        this.performEnter();
      } else {
        this.performExit();
      }
    } else if (this.state.status === "exited") {
      this.setState({ status: "unmounted" });
    }
  }

  performEnter() {
    this.setState({ status: "entering" }, () => {
      setTimeout(() => {
        this.setState({ status: "entered" });
      }, 0);
    });
  }

  performExit() {
    this.setState({ status: "exiting" }, () => {
      setTimeout(() => {
        this.setState({ status: "exited" });
      }, duration);
    });
  }

  render() {
    const { status } = this.state;
    if (status === "unmounted") {
      return null;
    }
    const { children } = this.props;
    return <div style={transitionStyle(status)}>{children}</div>;
  }
}

AnimationProvider.defaultProps = {
  show: false,
};

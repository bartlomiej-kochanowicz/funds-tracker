import { Switch } from 'antd';
import 'antd/dist/antd.css';

const App = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <Switch
        defaultChecked
        onChange={onChange}
      />
    </div>
  );
};

export default App;

import { Switch } from 'antd';

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

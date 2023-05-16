import React from 'react';
import './App.css';
// import { TabsProps,Space,Typography } from 'antd';
import PageContent from './pages/PageContent/PageContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import TicketManagement from './pages/TicketManagement/TicketManagement';
import TicketCheck from './pages/TicketCheck/TicketCheck';
import Setting from './pages/Setting/Setting';

// const items: TabsProps['items'] = [
//   {
//     key: '1',
//     label: `Tab 1`,
//     children: `Content of Tab Pane 1`,
//   },
//   {
//     key: '2',
//     label: `Tab 2`,
//     children: `Content of Tab Pane 2`,
//   },
//   {
//     key: '3',
//     label: `Tab 3`,
//     children: (
//       <Space>
//         <Typography.Text>Hello</Typography.Text>
//       </Space>
//     )
//   },
// ];
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageContent />}>
            <Route index path='/' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/quan-ly-ve' element={<TicketManagement />} />
            <Route path='/doi-soat-ve' element={<TicketCheck />} />
            <Route path='/cai-dat' element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

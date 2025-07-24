
import CompleteTask from './components/CompleteTask.js';
import CreateSlot from './components/CreateSlot.js';
import SlotForm from './components/SlotForm.js';

function DashboardPage() {
    return (
        <div className='dashboardParent'>
            <h2>Create New Slots</h2>
            <CreateSlot />
            <hr />
            <h2>Mark Tasks As Completed</h2>
            <CompleteTask />
        </div>
    )
}

export default DashboardPage
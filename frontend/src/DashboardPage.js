
import CompleteTask from './components/CompleteTask.js';
import CreateSlot from './components/CreateSlot.js';
import SlotForm from './components/SlotForm.js';

function DashboardPage() {
    return (
        <div>
            <CreateSlot />
            <CompleteTask />
        </div>
    )
}

export default DashboardPage
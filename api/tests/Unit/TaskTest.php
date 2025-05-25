<?php

namespace Tests\Unit;

use App\Models\Task;
use PHPUnit\Framework\TestCase;

class TaskTest extends TestCase
{
    public function test_task_can_be_instantiated_with_attributes()
    {
        $data = ['title' => 'Minha Tarefa', 'description' => 'Descrição da tarefa'];
        $task = new Task($data);

        $this->assertEquals('Minha Tarefa', $task->title);
        $this->assertEquals('Descrição da tarefa', $task->description);
    }

    public function test_task_attributes_can_be_set_and_get()
    {
        $task = new Task();
        $task->title = 'Outra Tarefa';
        $task->description = 'Outra descrição';

        $this->assertEquals('Outra Tarefa', $task->title);
        $this->assertEquals('Outra descrição', $task->description);
    }
}
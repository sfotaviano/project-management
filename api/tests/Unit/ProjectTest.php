<?php

namespace Tests\Unit;

use App\Models\Project;
use PHPUnit\Framework\TestCase;

class ProjectTest extends TestCase
{
    public function test_project_can_be_instantiated_with_attributes()
    {
        $data = ['name' => 'Meu Projeto', 'description' => 'Descrição'];
        $project = new Project($data);

        $this->assertEquals('Meu Projeto', $project->name);
        $this->assertEquals('Descrição', $project->description);
    }

    public function test_project_attributes_can_be_set_and_get()
    {
        $project = new Project();
        $project->name = 'Outro Projeto';
        $project->description = 'Outra descrição';

        $this->assertEquals('Outro Projeto', $project->name);
        $this->assertEquals('Outra descrição', $project->description);
    }
}
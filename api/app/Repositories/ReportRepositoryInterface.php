<?php

namespace App\Repositories;

interface ReportRepositoryInterface
{
  public function generate(?array $params = []): array;
}

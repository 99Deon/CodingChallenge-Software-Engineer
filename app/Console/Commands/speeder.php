<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;



class speeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Speeder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fast manage database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $operation = $this->ask('Do you want create or delete from table ?');

        // Check delete
        if (Str::lower($operation) == "delete") {
            $table = $this->ask('What is the name of table ?');
            foreach (DB::getSchemaBuilder()->getAllTables() as $key => $value) {
                if ($table == head($value)) {
                    $id = $this->ask('What is the ID of ' . $table . " ?");
                    // Check if if exist.
                    if (DB::table($table)->where('id', '=', $id)->delete()) {
                        $this->info('delete success');
                    }
                    $this->info('The ID does not exist !!');
                }
                $this->info('No table in this name');
            }
        }
        // Check create 
        if (Str::lower($operation) == "create") {
            $table = $this->ask('What is the name of table ?');
            foreach (DB::getSchemaBuilder()->getAllTables() as $key => $value) {
                if ($table == head($value)) {
                    $tableElement = [];
                    foreach (DB::getSchemaBuilder()->getColumnListing($table) as $key => $value) {
                        if ($value != "created_at" && $value != "updated_at" && $value != "id") {
                            $element = $this->ask('insert ' . $value);
                            $tableElement[$value] = $element;
                        }
                    }
                    DB::table($table)->insert($tableElement);
                    $this->info('The elemets add to ' . $table);
                }
                $this->info('No table in this name');
            }
        }
    }
}
